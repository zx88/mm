<template>
    <div id="main">
        <Header title="我的喵喵" />
        <div id="content">
            <Login />
        </div>
        <Tabar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Tabar from '@/components/Tabar'
import Login from '@/components/Login'
export default {
    name: 'Mine',
    components: {
        Header,
        Tabar,
        Login
    }
}
</script>

<style lang="scss" scoped>

</style>