---
title: Git Bash and Shell Command
date: "2019-09-08"
template: "post"
draft: false
slug: "/posts/git/git-bash-and-Shell-command/"
category: "Git"
tags:
  - "Git"
  - "Shell"
description: "Git Bash install and Shell Command"
---
<div id="toc">

**:link:  Table Of Contents**

- [Git bash Install](#git-bash-install)
- [Shell Command](#lets-learn-major-shell-command)

</div>

## Git bash Install

- Go to https://gitforwindows.org/
- Click the download button

## Let's learn Major Shell Command


### ls

__(en)__ ls is a Linux shell command that lists directory contents of files and directories.<br/>
__(ko)__ 파일과 디렉터리의 내용을 나열

<hr class="sub" />

### cd

__(en)__ Change Directory<br/>
__(ko)__ 파일 바꾸기

``` bash
XXX@XXX XXX ~/XXX
$cd .. : (en) Change to parent directory
         (ko) 상위 디렉터리로 이동
$cd ~ : (en) Change to home directory
        (ko) 사용자 디렉터리의 최상단으로 이동
```

<hr class="sub" />

### mkdir directory

__(en)__ Create directory<br/>
__(ko)__ 디렉터리 만들기

<hr class="sub" />

### touch file

__(en)__ Create file<br/>
__(ko)__ 파일 만들기

<hr class="sub" />

### mv file directory

__(en)__ Move file in current directory to subdirectory directory<br/>
__(ko)__ 파일을 && 디렉터리로 이동

``` bash
XXX@XXX XXX ~/XXX
$mv file file2 : (en) Rename file file to file2
                 (ko) file의 파일이름을 file2 파일로 이름 변경
```

<hr class="sub" />

### cp

__(en)__ cp is a Linux shell command to copy files and directories.<br/>
__(ko)__ 파일과 디렉터리를 복사

``` bash
XXX@XXX XXX ~/XXX
$cp file directory : (en) Copy file in current directory to subdirectory directory
                     (ko) file 파일을 && 디렉터리에 복사
```

<hr class="sub" />

### rm

__(en)__ rm is a Linux shell command to remove files and directories.<br/>
__(ko)__ 파일이나 폴더를 삭제

> __(en)__ To delete a folder, you must delete the file or directory in it.<br/>
__(ko)__ 폴더를 삭제하려면 폴더의 파일이나 디렉터리를 삭제하여야 한다

``` bash
XXX@XXX XXX ~/XXX
$rm -rf directory : (en) Delete all files in && directory
                    (ko) 디렉터리안의 모든 파일을 제거한다
```

<hr class="sub" />

### cat file

__(en)__ cat command is used to display the content of text files and to combine several files to one file.<br/>
__(ko)__ 텍스트 파일의 내용을 표시하고 여러파일을 하나의 파일에 결합