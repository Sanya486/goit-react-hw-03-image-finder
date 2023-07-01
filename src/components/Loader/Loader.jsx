import React from 'react'
import { Blocks } from 'react-loader-spinner';
import css from './Loader.module.css'

const Loader = () => {
  return <Blocks color="blue" wrapperClass={css.Loader} />;
}

export default Loader
