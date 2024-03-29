import Head from 'next/head'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { memberNFTAddress, tokenBankAddress } from '../../contracts'
import MemberNFT from '../contracts/MemberNFT.json'
import TokenBank from '../contracts/TokenBank.json'

export default function Home() {
  return (
    <div className={'flex flex-col items-center bg-slate-100 text-blue-900 mion-h-screen'}>
      <Head>
        <title>Token DApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}