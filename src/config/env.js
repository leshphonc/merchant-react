const cur = process.env.REACT_APP_CUR

const result = {
  cs: {
    logo: require('@/assets/image/logo.jpg'),
  },
  czg: {
    logo: require('@/assets/image/czg_logo.jpg'),
  },
}

export default result[cur]
