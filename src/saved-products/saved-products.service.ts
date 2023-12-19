import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SavedProducts } from 'src/schemas/savedProducts.schema';
import { CreateSavedProductDto } from './dto-for-savedProducts';
import { JwtDto } from 'src/auth/dto-for-auth';
import { SavedProductUtilities } from './utils-for-savedProducts/utils.for.savedProducts';
import { SavedProductsResponseDto } from './dto-for-savedProducts';

@Injectable()
export class SavedProductsService {
  constructor(
    @InjectModel(SavedProducts.name)
    private SavedProducts: Model<SavedProducts>,
    private SavedProductUtilities: SavedProductUtilities,
  ) {}

  async getSavedProducts(user: JwtDto) {
    try {
      const { client } = user;
      const GroupOfSavedProducts =
        await this.SavedProducts.findOne<SavedProductsResponseDto>({
          client,
        });
      if (GroupOfSavedProducts === null) {
        return 'noData';
      }

      return GroupOfSavedProducts.savedProducts;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createSavedProducts(data: CreateSavedProductDto, user: JwtDto) {
    try {
      const { client } = user;

      const clientSavedProducts =
        await this.SavedProducts.findOne<SavedProductsResponseDto>({ client });

      if (!clientSavedProducts) {
        const joinClientAndProducts = { ...data, client };
        await this.SavedProducts.create(joinClientAndProducts);
        return HttpStatus.OK;
      }

      const { savedProducts } = clientSavedProducts;
      const products = this.SavedProductUtilities.UpdateCart(
        savedProducts,
        data.savedProducts[0],
      );

      await this.SavedProducts.findOneAndUpdate(
        { client },
        { $set: { savedProducts: products } },
        { new: true },
      );

      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSavedProduct(productId: string, user: JwtDto) {
    try {
      const { client } = user;

      const clientSavedProducts =
        await this.SavedProducts.findOne<SavedProductsResponseDto>({ client });

      const { savedProducts } = clientSavedProducts;
      const deleteProduct = this.SavedProductUtilities.deleteProduct(
        savedProducts,
        productId,
      );

      await this.SavedProducts.findOneAndUpdate(
        { client },
        { $set: { savedProducts: deleteProduct } },
        { new: true },
      );
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
