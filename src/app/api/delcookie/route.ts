
//After middleware delete cookies, api send a redirect to login
export function GET(req:Request){
    if(req.method=='GET'){
        
        return Response.json({message: '/login'})
    }
}