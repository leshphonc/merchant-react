const cur = process.env.REACT_APP_CUR

const result = {
  cs: {
    logo: require('@/assets/image/logo.jpg'),
  },
  czg: {
    logo: require('@/assets/image/xyzg_logo.png'),
  },
}

export default result[cur]
