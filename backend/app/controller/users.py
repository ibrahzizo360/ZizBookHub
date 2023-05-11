from fastapi import APIRouter,Depends,Security

from app.schemas import ResponseSchema
from app.repositories.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from app.services.users import UserService

router = APIRouter(
    prefix="/users",
    tags=['user'],
    dependencies=[Depends(JWTBearer())]
)


@router.get("/me", response_model=ResponseSchema, response_model_exclude_none=False)
async def get_user_profile(credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    result = await UserService.get_user_profile(token['username'])
    return ResponseSchema(detail="Successfully fetch data!", result=result)


