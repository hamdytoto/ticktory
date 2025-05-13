import { Link } from 'react-router-dom'
const SignInLink = () => {
    return (
        <>
            <div className="mt-4 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
                    Sign In
                </Link>
            </div>
        </>
    )
}

export default SignInLink
