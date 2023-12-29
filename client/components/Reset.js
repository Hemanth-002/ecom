import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import Input from "./Input";
import useForm from "../hooks/useForm";
import { CardTitle } from "./FeatureCard";
import ButtonPrimary from "./ButtonPrimary";
import { CHECK_RESET_TOKEN } from "../graphql/mutation/reset";
import { Error, Form } from "./Login";

export const Success = styled.p`
  color: green;
  margin: 0;
`;

const Reset = () => {
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    email: "",
    password: "",
    token: "",
  });

  const [checkReset, { data, loading: checkLoading }] = useMutation(
    CHECK_RESET_TOKEN,
    {
      variables: {
        email: inputs.email,
        token: router?.query?.token || "",
        password: inputs.password,
      },
    }
  );
  const errors =
    data?.redeemUserPasswordResetToken?.code != "TOKEN_REDEEMED"
      ? data?.redeemUserPasswordResetToken?.message
      : undefined;
  const success =
    data?.redeemUserPasswordResetToken === null
      ? "Password Updated Successfully, Go ahead and Sign In"
      : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkReset();
  };

  if (checkLoading) return <p>Loading...</p>;
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CardTitle>Update your Password</CardTitle>
        {errors ? <Error>{errors}</Error> : null}
        {success ? <Success>{success}</Success> : null}

        <Input
          name="email"
          title="Email"
          required
          placeHolder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          title="Password"
          type="password"
          required
          placeHolder="Password"
          value={inputs.password}
          onChange={handleChange}
        />
        <ButtonPrimary text={"Reset Password"} type="submit" />
      </Form>
    </>
  );
};

export default Reset;
