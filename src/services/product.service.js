
const Category = require("../models/category.model.js");
const Product = require("../models/product.model");

async function createProduct(reqData){
    let topLevel=await Category.findOne({name:reqData.topLevelCategory});
  

    if(!topLevel){
        //  console.log("yses");
         topLevel= new Category({
             name:reqData.topLevelCategory,
             level:1,
            })
            await topLevel.save();
        }
        
        let secondLevel=await Category.findOne({
            name:reqData.secondLevelCategory,
            parentCategory: topLevel._id,
        })
        
        if(!secondLevel){
            secondLevel=new Category({
                name:reqData.secondLevelCategory,
                parentCategory:topLevel._id,
                level:2,
            })
            await secondLevel.save();
        }
        
        let thirdLevel =await Category.findOne({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
        })

     if(!thirdLevel){
        thirdLevel=new Category({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3,
        })
        await thirdLevel.save();
     }

     const product=new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountPresent:reqData.discountPresent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.size,
        quantity:reqData.quantity,
        category:thirdLevel._id,
     })

     return await product.save();
}

async function deleteProduct(productId){
    const product =await findProductById(productId);

    await product.findByIdAndDelete(productId);
    return "Product deleted successfully";
}

async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData);
}

async function findProductById(productId){
    const product=await Product.findById(productId).populate("category").exec();


    if(!product){
        throw new Error("Product not found with id ",id);
    }

    return product;
}

async function getAllProducts(reqQuery){
    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=reqQuery;

    pageSize=pageSize || 10;

    let query = Product.find().populate("category");
    // console.log("category",category);
    if(category){
        const existCategory = await Category.findOne({name:category});
        // console.log("checked existCategory",existCategory);
        if(existCategory){
            query.where("category").equals(existCategory._id);
        } else{
            return {content:[],currentPage:1,totalPages:0}
        }

    }

    if(color){
        const colorSet = new Set(color.split(",").map(color=>color.trim().toLowerCase()));

        const colorRagex=colorSet>0?new RegExp([...colorSet].join("|"),"i"): null;
        query=query.where("color").regex(colorRagex);
    }

    if(sizes){
        const sizeSet=new Set(sizes);
        query=(await query.where("sizes.name")).includes([...sizeSet]);
    }


    /************************ issue below the section*************
     expected error in = line no=122
      1) problem maybe in the fetching data from database 
      2) I get internal server error 500
    */
    
    if(minPrice !== 0 && maxPrice !== 0){
        console.log(minPrice," ",maxPrice);
        query=( query.where("discountedPrice").gte(minPrice)).filter(maxPrice);
    }
    console.log("oks");

    if(minDiscount){ 
        query=( query.where("discountPersent")).length(minDiscount);
    }

    if(stock){ 
        if(stock == "in_stock"){
        query=( query.where("quantity")).gt(0);
       }
       else if(stock == "out_stock"){
        query=( query.where("quantity")).gt(1);

       }
    }

    if(sort){
         const sortDirection=sort==="price_hight"?-1:1;
         query= query.sort({discountedPrice:sortDirection})

    }

    const totalProducts=await Product.countDocuments(query);

    const skip=(pageNumber-1)*pageSize;
    query=query.skip(skip).limit(pageSize);

    const products = await query.exec();

    const totalPages=Math.ceil(totalProducts/pageNumber);

    return{content:products,currentPage:pageNumber,totalPages}
}

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product)
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct
}