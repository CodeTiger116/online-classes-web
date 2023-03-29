<template>
    <div>
        <h2 style="text-align: center;">课程表</h2>
        <table>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">星期一</th>
                    <th scope="col">星期二</th>
                    <th scope="col">星期三</th>
                    <th scope="col">星期四</th>
                    <th scope="col">星期五</th>
                    <th scope="col">星期六</th>
                    <th scope="col">星期日</th>
                </tr>
            </thead>

            <tbody style="text-align: center;">
                <tr style="height: 80px">
                    <th scope="row">1-2节
                    </th>
                    <td id="table_1_1"></td>
                    <td id="table_2_1"></td>
                    <td id="table_3_1"></td>
                    <td id="table_4_1"></td>
                    <td id="table_5_1"></td>

                </tr>
                <tr style="height: 80px">
                    <th scope="row">3-4节
                    </th>
                    <td id="table_1_2"></td>
                    <td id="table_2_2"></td>
                    <td id="table_3_2"></td>
                    <td id="table_4_2"></td>
                    <td id="table_5_2"></td>
                </tr>
                <tr style="height: 80px">
                    <th scope="row">5-6节
                    </th>
                    <td id="table_1_3"></td>
                    <td id="table_2_3"></td>
                    <td id="table_3_3"></td>
                    <td id="table_4_3"></td>
                    <td id="table_5_3"></td>
                </tr>
                <tr style="height: 80px">
                    <th scope="row">7-8节
                    </th>
                    <td id="table_1_4"></td>
                    <td id="table_2_4"></td>
                    <td id="table_3_4"></td>
                    <td id="table_4_4"></td>
                    <td id="table_5_4">
                    </td>
                </tr>
                <tr style="height: 80px">
                    <th scope="row">9-10节
                    </th>
                    <td id="table_1_5"></td>
                    <td id="table_2_5"></td>
                    <td id="table_3_5"></td>
                    <td id="table_4_5"></td>
                    <td id="table_5_5">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    export default {
        name: "MyTable",
        data() {
            return {
                courseData: [],

            }
        },
        mounted() {
            this.initCourse();
        },
        //方法
        methods: {
            //初始化课程
            initCourse() {
                this.loading = true;
                this.getRequest('/course/info/').then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.courseData = resp;
                    }

                    //清空课程表
                    for (var i = 1; i < 6; i++) {
                        for (var j = 1; j < 6; j++) {
                            $("#table_" + j + "_" + i).html("");
                        }
                    }
                    //遍历课程表
                    for (var i = 0; i < courseData.length; i++) {
                        $("#table_" + courseData[i].week + "_" + courseData[i].jieci).html(courseData[i].courseName );
                    }
                })
            },
        }
    }

</script>

<style scoped>

</style>