import mongoose from 'mongoose';

const productSchema = new mongoose.Schema (
    {
        name: {type:String, reqired:true, unique: true },
        slug: {type:String, reqired:true, unique: true },
        image: {type:String, reqired:true,  },
        brand: {type:String, reqired:true,  },
        category: {type:String, reqired:true,  },
        description: {type:String, reqired:true,  },
        price: {type: Number, reqired:true,  },
        countInStock: {type: Number, reqired:true,  },
        rating: {type: Number, reqired:true,  },
        numReviews: {type: Number, reqired:true,  },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product; 
