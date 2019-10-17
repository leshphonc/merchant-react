const cur = process.env.CUR

const result = {
  cs: {
    logo: require('@/assets/image/logo.jpg'),
  },
  czg: {
    logo: require('@/assets/image/czg_logo.jpg'),
  },
}

export default result[cur]
