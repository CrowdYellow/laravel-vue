<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">
                    <img :src="logo.src" :alt="logo.title">
                    <span class="title">{{ logo.title }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheHeader',
    data() {
        return {
            logo: {
                src: `${this.uploadsUrl}Treasure/blob/master/icon.png?raw=true`,
                title: 'HQ-BLOG'
            }
        }
    },
    beforeCreate() {
        this.uploadsUrl = 'https://github.com/CrowdYellow/'
    }
}
</script>

<style scoped>
.title {
    color: #1b1a1a;
}
</style>