import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import PropTypes from 'prop-types'

import booksPageInitialPaths2ab63Resource from '../../../resources/books-page-initial-paths-2ab63'
import booksPageInitialProps6081cResource from '../../../resources/books-page-initial-props-6081c'

const Books11 = (props) => {
  return (
    <>
      <div className="books11-container">
        <Head>
          <title>Books1 - Investor Interactions Liaison</title>
          <meta
            property="og:title"
            content="Books1 - Investor Interactions Liaison"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(BooksEntities) => (
                  <>
                    <div className="books11-container1">
                      <h1>{BooksEntities?.title}</h1>
                      <span>{BooksEntities?.title}</span>
                      <span>{BooksEntities?.price}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.booksEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .books11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .books11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Books11.defaultProps = {
  booksEntities: [],
}

Books11.propTypes = {
  booksEntities: PropTypes.array,
}

export default Books11

export async function getStaticPaths() {
  const response = await booksPageInitialPaths2ab63Resource({})
  const totalCount = response?.meta?.pagination?.total
  const pagesCount = Math.ceil(totalCount / 10)
  return {
    paths: Array.from(
      {
        length: pagesCount,
      },
      (_, i) => ({
        params: {
          page: (i + 1).toString(),
        },
      })
    ),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await booksPageInitialProps6081cResource({
    ...context?.params,
    start: (context.params.page - 1) * 10,
  })
  return {
    props: {
      booksEntities: response?.data,
      ...response?.meta,
    },
    revalidate: 60,
  }
}
