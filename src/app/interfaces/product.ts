export interface IProduct {
    ProductID: string;
    NameAr: string;
    NameEn: string;
    DetailsAr: string;
    DetailsEn: string;
    Price: number;
    ProductImage: string;
    Quantity: number;
    createdAt: Date;
    UpdatedAt: Date;
    SubCatID: string;
    BrandId: string;
    IsDeleted: number;
}