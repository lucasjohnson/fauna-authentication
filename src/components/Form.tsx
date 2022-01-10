import React, { useState } from 'react';
import faunadb from 'faunadb';
import Input from './Input';
import Button from './Button';
import { Paragraph } from '../emotion/typography';
import { InputType, FaunaIndex, FormLabel } from '../enums/';
import { User } from '../interfaces/';

interface FormProps {
  setToken: (token: string) => void;
  errorMessage: string;
}

const Form: React.FC<FormProps> = ({ setToken, errorMessage }) => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [error, setError] = useState<boolean>(false);

  const handleInput = (event: MouseEvent): void => {
    const input = event.target as HTMLInputElement;

    setUser((prev) => ({
      ...prev,
      [input.name]: input.value,
    }));
  };

  const handleSubmit = (event: MouseEvent): void => {
    event.preventDefault();

    const q = faunadb.query;
    const authClient = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET,
    });

    authClient
      .query(
        q.Login(q.Match(q.Index(FaunaIndex.USERS_BY_EMAIL), user.email), {
          password: user.password,
        })
      )
      .then((response: { secret: string }) => {
        setError(false);
        setToken(response.secret);
      })
      .catch((error: {}) => {
        setError(true);
        console.error(error);
      });
  };

  return (
    <form>
      <Input
        name={FormLabel.EMAIL.toLowerCase()}
        label={FormLabel.EMAIL}
        type={InputType.TEXT}
        setUseState={handleInput}
      />
      <Input
        name={FormLabel.PASSWORD.toLowerCase()}
        label={FormLabel.PASSWORD}
        type={InputType.PASSWORD}
        setUseState={handleInput}
      />
      <div>
        <Button onClickFunction={handleSubmit}>Login</Button>
        {error && <Paragraph>{errorMessage}</Paragraph>}
      </div>
    </form>
  );
};

export default Form;
