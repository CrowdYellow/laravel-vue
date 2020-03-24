<template>
    <footer class="footer">
        <div class="container">
            <div class="row footer-top">
                <div class="col-sm-5 col-lg-5">
                    <p class="padding-top-xsm">{{ description }}</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "TheFooter",
    data() {
        return {
            description: 'HQ-BLOG 个人博客'
        }
    }
}
</script>

<style scoped>
    .footer {
        height: auto;
    }
</style>