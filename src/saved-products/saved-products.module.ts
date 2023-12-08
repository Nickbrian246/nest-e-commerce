import { Module } from '@nestjs/common';
import { SavedProductsService } from './saved-products.service';
import { SavedProductsController } from './saved-products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SavedProductUtilities } from './utils-for-savedProducts/utils.for.savedProducts';
import {
  SavedProductsSchema,
  SavedProducts,
} from 'src/schemas/savedProducts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavedProducts.name, schema: SavedProductsSchema },
    ]),
  ],
  providers: [SavedProductsService, SavedProductUtilities],
  controllers: [SavedProductsController],
})
export class SavedProductsModule {}
