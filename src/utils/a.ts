import bus from './bus'

bus.$on('change', (name: string) => {
    console.log(name)
})

bus.$emit('change', 123)