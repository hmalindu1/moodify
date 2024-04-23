import { SignUp } from '@clerk/nextjs'

/**
 * Renders the SignUpPage component.
 *
 * @return {JSX.Element} The rendered SignUpPage component.
 */
const SignUpPage = () => {
  return <SignUp afterSignInUrl={'/new-user'} redirectUrl={'/new-user'} />
}

export default SignUpPage
