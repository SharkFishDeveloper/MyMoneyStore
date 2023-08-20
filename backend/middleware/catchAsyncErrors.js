module.exports = (insertFunc)=>(req,res,next)=>{
        Promise.resolve(insertFunc(req,res,next)).catch(next);
};
//! didn't understand this function- higher order function
