from fastapi import APIRouter,Response
from services.auth_services import AuthService
from schemas import ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema
from repositories.users_repo import UsersRepository
from services.email import send_verification_code
from schemas import EmailVerificationSchema
from fastapi import APIRouter,HTTPException
import hashlib
import json

router = APIRouter(prefix="/auth", tags=['Authentication'])


@router.post("/register", response_model=ResponseSchema, response_model_exclude_none=False)
async def register(request_body: RegisterSchema):
    AuthService.register_service(request_body)
    verification_code =  send_verification_code(request_body.email)
    UsersRepository.update_verification_code_value(request_body.email, verification_code)
    return ResponseSchema(detail="Successfully save data!")


@router.post("/login", response_model=ResponseSchema)
async def login(request_body: LoginSchema):
    token = await AuthService.logins_service(request_body)
    email_verified = UsersRepository.find_email_verified_value(request_body.username)
    email_verified = dict(email_verified)["email_verified"]
    response = Response(content=json.dumps({"detail": "Successfully login",
                        "result": {"token_type": "Bearer", "access_token": token, "email_verified": email_verified}}))
    response.set_cookie(
                key="access_token", value=token, httponly=True
            )
    return response



@router.post("/forgot-password", response_model=ResponseSchema, response_model_exclude_none=True)
async def forgot_password(request_body: ForgotPasswordSchema):
    await AuthService.forgot_password_service(request_body)
    return ResponseSchema(detail="Successfully update data!")


@router.post("/verify" )
async def verify_email(request_body: EmailVerificationSchema):
    user_verification_code =  hashlib.sha256(str(request_body.verification_code).encode('iso-8859-1')).hexdigest()
    email =  UsersRepository.find_email_by_verificationcode(user_verification_code)
    if email is None:
        raise HTTPException(status_code=400, detail="Invalid Verification code!")
    UsersRepository.verify_email(email)
    return ResponseSchema(detail="Email verified successfully!",result={"email_verified": "true"})


      

