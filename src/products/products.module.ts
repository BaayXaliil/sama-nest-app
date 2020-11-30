import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductName, ProductSchema } from './models/schemas/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductName, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
