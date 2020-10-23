### 表单

表单一：

0. ~~id~~（自增，主键）
1. ~~user_uuid(uuid)
2. name
3. gender
4. birthday
5. email
6. QQ
7. phone
8. phone_area
9. graduated_time
10. highest_education
11. school
12. discipline
13. skills
14. gaming_experience
15. campus_experience
16. resume
17. student_identifier
18. entries

表单二：

11. 技能水平 key val
12. 游戏经历 text
13. 校园经历 text

表单三：

14. 上传简历 file url
15. 上传学生证 file url
16. 作品附件 file url
17. ~~验证码~~
18. ~~同意报名~~

### asset

1. id
2. asset_uuid
3. type (file, folder)
4. original_name
5. name
6. url
7. desc
8. parent_asset_id
9. user_id

### school

1. id
2. school_uuid
3. name
4. desc

### discipline

1. id
2. discipline_uuid
3. name
4. desc
