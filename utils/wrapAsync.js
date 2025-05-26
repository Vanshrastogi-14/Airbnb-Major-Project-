// calls next for any error to expressERROR
module.exports = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    };
};