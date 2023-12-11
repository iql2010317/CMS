<script>
export default {
  data() {
    return {
      username: '',
      password: '',

      staffList: [],
      studentList: [],

      foundStudent: []
    };
  },
  mounted() {
    this.searchStaff();
    this.searchStudent();
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
        .catch(error => console.error('Error:', error))

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

    login() {
      const foundStudent = this.studentList.find(student => {
        return student.studentId.toString() === this.username && student.name === this.password;
      });

      if (foundStudent) {
        // 找到符合的學生資訊
        console.log('登入成功，學生資訊：', foundStudent);
        alert("登入成功")
        // 將 foundStudent 存儲到 session 中
        sessionStorage.setItem('foundStudent', JSON.stringify(foundStudent));

        // 導航到 BackstageSP 路由
        this.$router.push({ name: 'BackstageSP' });
      } else {
        const foundStaff = this.staffList.find(staff => {
          return staff.staffId.toString() === this.username && staff.name === this.password;
        });

        if (foundStaff) {
          // 找到符合的職員資訊
          console.log('登入成功，職員資訊：', foundStaff);
          alert("職員登入成功")
          // 將 foundStaff 存儲到 session 中
          sessionStorage.setItem('foundStaff', JSON.stringify(foundStaff));

          // 導航到相應的職員路由
          this.$router.push({ name: 'BackstageSP' });
        } else {
          // 找不到符合的使用者資訊
          console.log('登入失敗，請檢查編號和姓名是否正確');
          alert("找不到使用者")
          // 可以顯示錯誤訊息給使用者或採取其他適當的措施
        }
      }
    },

  }
}
</script>

<template>
  <div class="home">
    <div class="description">
      <h1>歡迎來到課程管理系統</h1>
      <p>這是一個用於管理課程、學生和職員的系統。管理員可以進行課程安排、學生管理和職員管理。</p>
      <p>登入系統可以開始管理您的課程和人員資訊。</p>
    </div>

    <div class="login">
      <h2>登入</h2>
      <form @submit.prevent="login">
        <label for="username">人員編號</label>
        <input type="text" id="username" v-model="username" required>

        <label for="password">姓名</label>
        <input type="text" id="password" v-model="password" required>

        <button type="submit">登入</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  // gap: 50px;
  // padding: 0 20px;
}

.description {
  flex: 1;
  max-width: 50%;
}

.login {
  flex: 1;
  max-width: 40%;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  /* 使表單寬度填滿父容器 */
}

input,
button {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  /* 讓輸入框和按鈕寬度填滿父元素 */
}

button {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
