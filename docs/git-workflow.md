# Git Workflow

در این داکیومنت روند توسعه یک Feature جدید در پروژه با استفاده از Git و GitHub توضیح داده شده است.

هدف از این Workflow این است که تغییرات هر Feature به صورت مستقل توسعه داده شوند و پس از بررسی، به Branch اصلی پروژه (main) اضافه شوند.

## 1. به‌روزرسانی Branch اصلی

قبل از شروع توسعه یک Feature جدید، ابتدا به Branch اصلی پروژه میرویم و آخرین تغییرات را دریافت میکنیم.

```bash
git switch main
git pull origin main
```

## 2. ایجاد Branch جدید

برای هر Feature یک Branch جداگانه ایجاد میکنیم.

```bash
git switch -c feature/search
```

نام Branch بهتر است نشان‌دهنده نوع تغییر باشد.

نمونه:

- feature/login
- feature/search
- feature/dark-mode
- fix/navbar
- refactor/theme

## 3. توسعه Feature

در این مرحله تغییرات موردنظر روی پروژه اعمال میشوند.

پس از اتمام توسعه، وضعیت فایل‌ها بررسی میشود.

```bash
git status
```

سپس فایل‌ها به Staging Area اضافه میشوند.

```bash
git add .
```

در نهایت تغییرات Commit میشوند.

```bash
git commit -m "Add search feature"
```

## 4. ارسال Branch به GitHub

پس از ثبت Commit، Branch به GitHub ارسال میشود.

```bash
git push -u origin feature/search
```

در Pushهای بعدی کافی است دستور زیر اجرا شود.

```bash
git push
```

## 5. ایجاد Pull Request

پس از ارسال Branch به GitHub، یک Pull Request ایجاد میشود.

ا Pull Request درخواست ادغام تغییرات Branch فعلی با Branch اصلی پروژه است.

در Pull Request اعضای تیم میتوانند:

- کدها را بررسی کنند.
- نظر (Review) ثبت کنند.
- پیشنهاد اصلاح بدهند.
- در صورت تأیید، تغییرات را Merge کنند.

## 6. Merge کردن Feature

پس از تأیید Pull Request، تغییرات Branch با Branch اصلی ادغام (Merge) میشوند.

بعد از Merge، آخرین تغییرات را دریافت می‌کنیم.

```bash
git switch main

git pull origin main
```
