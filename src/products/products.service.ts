import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces/user.interface';
import { CreateProductDTO } from './models/dto/create-product.dto';
import { ProductDocument } from './models/interfaces/product.interface';
import { ProductName } from './models/schemas/product.schema';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(ProductName) private productModel: Model<ProductDocument>) {
    }

    async findAll(): Promise<ProductDocument[]> {
        return await this.productModel.find()
    } 

    async findUser(user): Promise<IUser> {
        const product = await this.productModel.findOne({user})
        return product.user;
    }

    async findOne(id: string): Promise<ProductDocument> {
        return await this.productModel.findById(id)
    }

    async createProduct(createProductDTO: CreateProductDTO, user): Promise<ProductDocument> {
        const newProduct = new this.productModel(createProductDTO);        
        newProduct.user = user;        
        return await newProduct.save()
    }

    async updateProduct(id: string, updateProduct: CreateProductDTO): Promise<ProductDocument> {
        return await this.productModel.findByIdAndUpdate(id, updateProduct)
    }

    async deleteProduct(id: string) :Promise<ProductDocument> {
        return await this.productModel.findByIdAndDelete(id)
    }
}
