import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Investor Interactions Liaison</title>
          <meta
            property="og:title"
            content="test-page - Investor Interactions Liaison"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_7m3ph) => (
            <>
              <h1>{context_7m3ph?.name}</h1>
            </>
          )}
          initialData={props.context7m3phProp}
          persistDataDuringLoading={true}
          key={props?.context7m3phProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  const context7m3phProp = await testPageResource({
    ...context?.params,
  })
  return {
    props: {
      context7m3phProp: context7m3phProp?.data?.[0],
    },
  }
}
