<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<template>
    <tbody>
        <tr>
            <td colspan="2">
                <p v-html="title"></p>
            </td>
        </tr>
    </tbody>
</template>

<style lang="scss" scoped></style>
