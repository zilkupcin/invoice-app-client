import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'


const Invoice: NextPage = () => {
  const router = useRouter()
  const { invoiceId } = router.query;


  return (
   <div>{invoiceId}</div>
  )
}

export default Invoice;
