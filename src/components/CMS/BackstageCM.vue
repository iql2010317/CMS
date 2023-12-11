<script>
export default {
    data() {
        return {
            foundStudent: JSON.parse(sessionStorage.getItem('foundStudent')),
            foundStaff: JSON.parse(sessionStorage.getItem('foundStaff')),

            coursesTableList: [],
            showCreateNewCoursesPage: false, // 加上這行

            courseCode: '',
            courseName: '',
            instructor: '',
            description: '',
            classDay: '',
            startTime: '',
            endTime: '',
            coursePeriodStart: '',
            coursePeriodEnd: '',
            active: '',
            locationCity: '',
            createdAt: '',
            updatedAt: '',
            modifiedBy: '',


            selectedCourses: [] // 存储选中的课程代号

        };
    },
    mounted() {
        this.searchCoursesTable();
    },
    computed: {

    },

    methods: {

        openNewPage() {
            this.showCreateNewCoursesPage = true
        },
        goBackToList() {
            this.showCreateNewCoursesPage = false
        },

        searchCoursesTable() {

            const url = new URL('http://localhost:8080/api/CMS/CoursesTable/searchAllCoursesTable');


            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    this.coursesTableList = data.coursesTableList
                    console.log(this.coursesTableList);
                })
                .catch(error => console.error('Error:', error));
        },
        createNewCourseTable() {
            const newCoursesTable = {
                courseCode: this.courseCode,
                courseName: this.courseName,
                instructor: this.instructor,
                description: this.description,
                classDay: this.classDay,
                startTime: this.startTime,
                endTime: this.endTime,
                coursePeriodStart: this.coursePeriodStart,
                coursePeriodEnd: this.coursePeriodEnd,
                active: this.active,
                locationCity: this.locationCity,
                createdAt: "2023-12-20",
                updatedAt: "2023-12-20",
                modifiedBy: "Admin"
            };
            // 
            fetch('http://localhost:8080/api/CMS/CoursesTable/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ coursesTable: newCoursesTable })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));

            alert("成功新增課程資料");

        },

        courseSelect() {
            // // 将数组转换为以逗号分隔的字符串
            // const selectedCourseCodes = this.selectedCourses.join(',');

            const newstudentSelectCourse = {
                studentId: this.foundStudent.studentId,
                name: this.foundStudent.name,
                // courseCode: selectedCourseCodes,
                courseCode:this.selectedCourses,
            };
            console.log(newstudentSelectCourse)

            fetch('http://localhost:8080/api/CMS/student/selectCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentSelectCourse: newstudentSelectCourse })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));

            alert("選課成功，待審核");

        },

    }
};
</script>

<template>
    <div class="BackStageCMBody">
        <table class="CoursesTableList">
            <thead>
                <tr>
                    <th>
                        選課
                    </th>
                    <th>課程代碼</th>
                    <th>課程名稱</th>
                    <th>授課者</th>
                    <th>日期</th>
                    <th>是否開課</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(course, index) in coursesTableList" :key="index">
                    <td>
                        <input type="checkbox" :value="course.courseCode" v-model="selectedCourses">
                    </td>
                    <td>{{ course.courseCode }}</td>
                    <td>{{ course.courseName }}</td>
                    <td>{{ course.instructor }}</td>
                    <td>{{ course.classDay }}</td>
                    <td>{{ course.active }}</td>
                </tr>
            </tbody>
        </table>
        <button @click="openNewPage()">新增課程資訊(only for staff)</button>

        <!-- 覆蓋背景層 -->
        <div class="overlay" v-if="showCreateNewCoursesPage" @click="goBackToList()"></div>
        <div class="CreateNewCourses" v-if="showCreateNewCoursesPage">
            <table class="course-form">
                <tbody>
                    <tr>
                        <td><label for="courseCode">課程代碼</label></td>
                        <td><input type="text" id="courseCode" placeholder="課程代碼" v-model="courseCode"></td>
                        <td><label for="courseName">課程名稱</label></td>
                        <td><input type="text" id="courseName" placeholder="課程名稱" v-model="courseName"></td>
                    </tr>
                    <tr>
                        <td><label for="instructor">授課者</label></td>
                        <td><input type="text" id="instructor" placeholder="授課者" v-model="instructor"></td>
                        <td><label for="city">開課城市</label></td>
                        <td>
                            <select id="city">
                                <option value="">選擇城市</option>
                                <option value="台北市">台北市</option>
                                <!-- 其他城市選項 -->
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="weekday">禮拜幾</label></td>
                        <td colspan="3">
                            <select id="weekday" multiple>
                                <option value="星期一">星期一</option>
                                <option value="星期二">星期二</option>
                                <!-- 其他禮拜幾選項 -->
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="startDate">開始日期</label></td>
                        <td><input type="date" id="startDate" v-model="coursePeriodStart"></td>
                        <td><label for="endDate">結束日期</label></td>
                        <td><input type="date" id="endDate" v-model="coursePeriodEnd"></td>
                    </tr>
                    <tr>
                        <td><label for="startTime">開始時間</label></td>
                        <td><input type="time" id="startTime" v-model="startTime"></td>
                        <td><label for="endTime">結束時間</label></td>
                        <td><input type="time" id="endTime" v-model="endTime"></td>
                    </tr>
                    <tr>
                        <td><label for="description">課程描述</label></td>
                        <td colspan="3"><textarea id="description" v-model="description" placeholder="課程描述"></textarea></td>
                    </tr>
                </tbody>
            </table>

            <div class="buttons">
                <button @click="createNewCourseTable()">儲存草稿</button>
                <button @click="createNewCourseTable()">確定開課</button>
            </div>
        </div>


    </div>

    <div class="studentCourseSelectArea">
        <button @click="courseSelect()">確定選課</button>
    </div>
</template>


<style lang="scss" scoped>
.BackStageCMBody {
    padding: 20px;
    position: relative;
    // text-align: center;
    /* 將內容置中 */
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明黑色背景 */
    z-index: 1;
    /* 放置於下方 */
}


.CoursesTableList {
    width: 100%;
    border-collapse: collapse;
}

.CoursesTableList th,
.CoursesTableList td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.CoursesTableList th {
    background-color: #f2f2f2;
    color: #333;
}

.CoursesTableList tr:nth-child(even) {
    background-color: #f9f9f9;
}

.CoursesTableList tr:hover {
    background-color: #f2f2f2;
}


.CreateNewCourses {

    margin-top: 100px;
    position: absolute;
    // top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 60vw;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 2;

    .course-form {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;

        td {
            padding: 8px;
            border: 1px solid #ccc;
        }

        input[type="text"],
        select,
        textarea {
            width: calc(100% - 20px);
            padding: 8px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
        }

        button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background-color: #4caf50;
            color: white;
            cursor: pointer;
            margin-right: 10px;

            &:hover {
                background-color: #45a049;
            }
        }
    }
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.buttons button {
    margin-right: 10px;
    padding: 8px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.buttons button:hover {
    background-color: #45a049;
}
</style>



