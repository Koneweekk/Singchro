//비밀번호 유효성 검사
const checkPassword = (pw:string | null | undefined) => {
    if (!pw) return false;
    //  8 ~ 16자 영문, 숫자 조합
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/
    // 형식에 맞는 경우 true 리턴
    return regExp.test(pw)
}

// 이메일 유효성 검사
const checkEmail = (email:string | null) => {
  if (!email) return false;
    // 숫자만 입력시
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    // 형식에 맞는 경우 true 리턴
    return regExp.test(email)
}

export { checkPassword, checkEmail }