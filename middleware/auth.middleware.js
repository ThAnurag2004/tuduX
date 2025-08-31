import {tokenValidation} from '../utils/token.js'

export async function authMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];

    if(!authHeader) return next();

    if(!authHeader.startsWith('Bearer')){
        return res.status(400).json({error : 'Header must starts with Bearer'})
    }

    const [_,token] = authHeader.split(' ');

    const payload = await tokenValidation(token);
    req.user = payload;
    next();
}


export function ensureAuthenticated(req, res, next) {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ error: 'You must be logged in to access this resource' });
  }
  next();
}