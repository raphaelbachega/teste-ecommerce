import { CACHE_MANAGER, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EStock } from 'src/shared/enum/stock.enum';
import { initialStock } from './data-mock/stock.data';
import { CreateStockDto } from './dto/create-stock.dto';


@Injectable()
export class StockService implements OnModuleInit {
  private readonly logger = new Logger(StockService.name);
  constructor(

    @Inject(CACHE_MANAGER) private cacheManagerStock: Cache,
  ) { }
  async onModuleInit() {
    await this.cacheManagerStock.reset()

    const stockDto: Array<CreateStockDto> = initialStock.stock
    stockDto.forEach(async itemList => {
      await this.cacheManagerStock.set(itemList.sku, itemList);
    });
  }

  async sortActionStock(message: any) {
    const orderMessage = message.message
    await this.alterStock(orderMessage, orderMessage.status)
  }

  async alterStock(message: any, orderStatus: string) {
    const orderList = await message.itemList
    const skuKeys = orderList.map((item: { sku: string; }) => item.sku);
    const allItemsCache: { [key: string]: any } = {};

    for (const key of skuKeys) {
      const productCache = await this.cacheManagerStock.get(key)
      if (productCache) {
        allItemsCache[key] = productCache;
      } else {
        this.logger.error(`ERRO: Item ${key} não encontrado.`)
      }
    }
    for (const key of Object.keys(allItemsCache)) {
      const itemStockCache = allItemsCache[key];
      const orderListItem = orderList.find((item: { sku: string; }) => item.sku === key);
      if (orderStatus == EStock.NEW_ORDER) {

        this.updateStockNewOrder(itemStockCache, orderListItem)
        await this.cacheManagerStock.set(key, itemStockCache);

      }else if (orderStatus == EStock.CANCEL_ORDER) {

        this.updateStockCancelOrder(itemStockCache, orderListItem)
        await this.cacheManagerStock.set(key, itemStockCache);

      }else if (orderStatus == EStock.UPDATE_ORDER) {
        
      }
    }
  }

  updateStockCancelOrder(itemStockCache: any, orderListItem: any) {
    this.logger.log(`Item ${itemStockCache.sku} re-adicionado ao estoque.`)
    itemStockCache.quantity += orderListItem.quantity;
    return itemStockCache
  }

  async updateStockNewOrder(itemStockCache: any, orderListItem: any) {
    if ((itemStockCache.quantity - orderListItem.quantity) < 0) {
      if (itemStockCache.quantity == 0) {
        this.logger.error(`ERRO: Não existe estoque para o item ${orderListItem.sku}.`)
      } else {
        this.logger.error(`ERRO: Existem apenas ${itemStockCache.quantity} itens de ${orderListItem.sku} no estoque, o estoque será zerado.`)
      }
      itemStockCache.quantity = 0;
      return itemStockCache;
    } else {
      itemStockCache.quantity -= orderListItem.quantity;
      return itemStockCache;
    }
  }
}