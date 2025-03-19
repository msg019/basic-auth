import { createHash, timingSafeEqual} from 'crypto'
import { SignJWT } from 'jose'
import { key, secret_value } from './data'


export const Hashear=(pass:string)=>{

    const hash=createHash('sha256').update(pass).digest('hex')

    return hash
}

export const compareHash=(hash1:string, hash2:string):boolean=> {

    const buff1= Buffer.from(hash1, 'hex')
    const buff2= Buffer.from(hash2, 'hex')

    if(buff1.length!==buff2.length){return false}

    return timingSafeEqual(buff1,buff2)
}


export const createToken=async()=>{

    const jwt = new SignJWT({value:secret_value})
      .setProtectedHeader({alg:'HS256', kid:"1bb9605c36e69386830202b2d"})
      .setIssuedAt()
      .setExpirationTime("10min")
      .sign(new TextEncoder().encode(key))
  
      return jwt
  }
    
  

