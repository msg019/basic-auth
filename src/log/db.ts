import { Pool } from 'pg'
import { User, config } from './data';


export const addUser=async(user:User)=>{
    try{
        const pool= new Pool(config)
        const {id, username,password  }= user
        const checkSql='Select * from Users where username=$1'
        const sql="Insert into Users values($1,$2,$3)"
        
        await pool.connect()
        const result= await pool.query(checkSql,[username])

        if(result.rows.length>0){
            return 'This user is already created'
        }else if(result.rows.length==0){
            await pool.query(sql, [id,username,password])
            return 'User registered'
        }
        
        

    }catch{
        return {message:'Error'}
    }
}


export const getPassw=async(user:User)=>{
    try{
        const pool= new Pool(config)
        const { username }= user

        await pool.connect()
        const result= await pool.query("Select (password) from Users where username=$1",[username])

        pool.end()
        
        return result.rows[0].password

    }catch{

        return ''
    }
}

