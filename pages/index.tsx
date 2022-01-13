import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import HomeHeader from '../components/HomeHeader';

const Home: NextPage = () => {
  return (
   <HomeHeader></HomeHeader>
  )
}

export default Home
