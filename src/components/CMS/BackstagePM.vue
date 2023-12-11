<script>
export default {
    data() {
        return {
            staffList: [],
            studentList: [],
            selectedList: 'staff',

            staffId: '',
            staffName: '',

            studentId: '',
            studentName: '',

        };
    },
    mounted() {
        this.searchStaff();
        this.searchStudent();
    },
    computed: {
        displayList() {
            return this.selectedList === 'staff' ? this.staffList : this.studentList;
        }
    },

    methods: {

        searchStaff() {

            const url = new URL('http://localhost:8080/api/CMS/Staff/searchAllStaff');


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
                    this.staffList = data.staffList;
                    console.log(this.staffList);
                })
                .catch(error => console.error('Error:', error));
        },
        searchStudent() {

            const url = new URL('http://localhost:8080/api/CMS/Student/searchAllStudent');


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
                    this.studentList = data.studentList
                    console.log(this.studentList)
                })
                .catch(error => console.error('Error:', error));
        },

        createStaff() {
            const newStaff = {
                staffId: this.staffId,
                name: this.staffName,
            };

            fetch('http://localhost:8080/api/CMS/Staff/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ staff: newStaff })
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

            alert("成功新增職員資料");
        },
        createStudent() {
            const newStudent = {
                studentId: this.studentId,
                name: this.studentName,
            };

            fetch('http://localhost:8080/api/CMS/Student/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ student: newStudent })
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

            alert("成功新增學生資料");
        }

    }
};
</script>

<template>
    <div class="BackStagePMBody">
        <div>
            <select v-model="selectedList">
                <option value="staff">職員列表</option>
                <option value="student">學生列表</option>
            </select>
            <table v-if="selectedList === 'staff'">
                <thead>
                    <tr>
                        <th>職員編號</th>
                        <th>名稱</th>
                        <th>Email</th>
                        <th>生日</th>
                        <th>管理權限</th>
                        <th>帳號啟用</th>
                        <th>註冊時間</th>
                        <th>編輯</th>
                        <th><button>刪除</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(staff, index) in staffList" :key="index">
                        <td>{{ staff.staffId }}</td>
                        <td>{{ staff.name }}</td>
                        <td>{{ staff.email }}</td>
                        <td>{{ staff.dateOfBirth }}</td>
                        <td>{{ staff.permissionLevel }}</td>
                        <td>{{ staff.accountStatus }}</td>
                        <td>{{ staff.registrationTime }}</td>
                        <td>編輯</td>
                        <td><input type="checkbox" name="" id=""></td>
                    </tr>
                </tbody>
            </table>
            <table v-else-if="selectedList === 'student'">
                <thead>
                    <tr>
                        <th>學號</th>
                        <th>名稱</th>
                        <th>Email</th>
                        <th>生日</th>
                        <th>年齡</th>
                        <th>註冊時間</th>
                        <th>享有補助</th>
                        <th>編輯</th>
                        <th><button>刪除</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, index) in studentList" :key="index">
                        <td>{{ student.studentId }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.email }}</td>
                        <td>{{ student.dateOfBirth }}</td>
                        <td>{{ student.age }}</td>
                        <td>{{ student.registrationTime }}</td>
                        <td>{{ student.hasGrant }}</td>
                        <td>編輯</td>
                        <td><input type="checkbox" name="" id=""></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="creatNewStaff" v-if="selectedList === 'staff'">
        <label for="職員工號">職員工號</label>
        <input type="text" id="職員工號" placeholder="職員工號" v-model="staffId">
        <label for="職員名稱">職員名稱</label>
        <input type="text" id="職員名稱" placeholder="職員名稱" v-model="staffName">
        <button @click="createStaff()">新增職員</button>
    </div>
    <div class="creatNewStudent" v-if="selectedList === 'student'">
        <label for="學生學號">學生學號</label>
        <input type="text" id="學生學號" placeholder="學生學號" v-model="studentId">
        <label for="學生名稱">學生名稱</label>
        <input type="text" id="學生名稱" placeholder="學生名稱" v-model="studentName">
        <button @click="createStudent()">新增學生</button>
    </div>
</template>


<style lang="scss" scoped>
/* Reset some default table styles */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

/* Alternate row colors */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Style the header */
th {
    background-color: #4caf50;
    color: white;
}

/* Style form elements */
label {
    margin-top: 10px;
    display: block;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>


