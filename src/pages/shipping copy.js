import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { Store } from 'utils/store';
import useStyles from 'utils/styles';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import CheckoutWizzard from '../../components/CheckoutWizzard';

export default function Shipping() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const classes = useStyles();
  const submitHandler = (
    e,
    { fullName, address, city, postalCode, country }
  ) => {
    e.preventDefault();

    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set('shippingAddress', {
      fullName,
      address,
      city,
      postalCode,
      country,
    });
    router.push('/payment');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizzard activeStep={1} />
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              id="fullName"
              label="Full Name"
              required="true"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              id="address"
              label="Address"
              required="true"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              id="city"
              label="City"
              required="true"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              id="postalCode"
              label="Postal Code"
              required="true"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              id="coutry"
              label="Country"
              required="true"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="secondary"
              onClick={() => router.push('/payment')}
            >
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
