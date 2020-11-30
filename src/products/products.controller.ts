import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUser } from 'src/user/interfaces/user.interface';
import { CreateProductDTO } from './models/dto/create-product.dto';
import { ProductDocument } from './models/interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Req() req: Request, @Body() createProduct: CreateProductDTO): Promise<ProductDocument> {
        return this.productService.createProduct(createProduct, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProducts(@Req() req: Request) {
        return this.productService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get('user')
    getUserProduct(@Req() req: Request) {
        const user = this.productService.findUser(req.user)
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteProduct(@Res() res, @Param('id') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }
}
