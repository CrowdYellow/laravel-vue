<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" @click="toggleNav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <router-link to="/" class="navbar-brand">
                    <img src="../../assets/icon.png" :alt="logo.title">
                    <span class="title">{{ logo.title }}</span>
                </router-link>
            </div>

            <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
                <ul class="nav navbar-nav">
                    <li v-for="(item, index) in navList" :class="{ active: index === activeNavIndex }">
                        <a href="#" @click="changeNavIndex(index)">{{ item.name }}</a>
                    </li>
                </ul>
                <div class="navbar-right">
                    <TheEntry/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getCategory
} from "../../axios/call";
import TheEntry from '@/components/layouts/TheEntry'
export default {
    name: 'TheHeader',
    components: {
        TheEntry
    },
    data() {
        return {
            logo: {
                title: 'HQ-BLOG'
            },
            navList: [],
            activeNavIndex: 0,
            showCollapsedNav: false
        }
    },
    mounted() {
        this.getCat()
    },
    methods: {
        getCat () {
            getCategory().then(response => {
                this.navList = response;
            }).catch(err => {
                console.log(response);
            })
        },
        changeNavIndex(index) {
            this.activeNavIndex = index
        },
        toggleNav() {
            this.showCollapsedNav = !this.showCollapsedNav
        }
    }
}
</script>

<style scoped>
.title {
    color: #1b1a1a;
    display: none;
}
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>