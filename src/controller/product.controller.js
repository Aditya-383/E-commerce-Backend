const productService=require("../services/product.service.js")


const createProduct=async(req,res)=>{
  
    try {
        const product=await productService.createProduct(req.body);
        console.log(" create product");
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deleteProduct=async(req,res)=>{
    const productId=req.params.id;
    try {
        const product=await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}


const updateProduct=async(req,res)=>{
    const productId=req.params.id;
    try {
        const product=await productService.updateProduct(productId,req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const findProductById=async(req,res)=>{
    const productId= await req.params.id;
    try {
        console.log("findProductById section");
        const product=await productService.findProductById(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}


const getAllproducts=async(req,res)=>{
    // const productId=req.params.id;
    try {
        console.log("get All product section");
        const products=await productService.getAllProducts(req.query);
        console.log(products);
        return res.status(201).send(products);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}


const createMultipleProduct=async(req,res)=>{
    const productId=req.params.id;
    try {
        const product=await productService.createMultipleProduct(req.body);
        return res.status(201).send({message:"Products created successfully"});
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllproducts,
    createMultipleProduct,
    findProductById
}