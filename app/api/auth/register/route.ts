const POST = async (req: Request) => {
try {
    const {username, email, password} = await req.json()
    if (email.trim().length() === 0 || password.trim().length() === 0 || username.trim().length() === 0) return

    console.log(username, email, password)
} catch (error) {
    console.log({error})
}
}

export default POST