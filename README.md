# TwitterVideoParser KSU

一个面向 Android 的 **KernelSU 模块**，用于扩展 Twitter/X 相关视频解析与处理能力。

> 本项目主要面向已经获取 Root / KernelSU 权限的 Android 用户。

<img width="1080" height="2316" alt="f5fafd76d9197acac9687a96b1396619" src="https://github.com/user-attachments/assets/a3f42c52-f24c-454e-8a8a-50ff92f378df" />


<img width="1080" height="2316" alt="6b8bd275f13851a5372615597693b0c7" src="https://github.com/user-attachments/assets/4055a97c-162f-4d13-9590-4e9b2e5a2523" />



## ✨ 功能

* 🎬 Twitter / X 视频解析
* 📦 以 KernelSU 模块形式运行
* ⚙️ 自动完成模块所需的初始化与配置
* 🔧 支持在 Root 环境下进行系统级配置
* 🧩 无需修改 Twitter / X APK
* 🔄 支持通过 KernelSU 管理器安装、启用和卸载

## 📱 兼容性

| 项目       | 要求                           |
| -------- | ---------------------------- |
| Android  | Android 8.0+                 |
| Root     | 必须                           |
| KernelSU | 推荐                           |
| Magisk   | 部分环境可用，具体以模块实际兼容性为准          |
| 架构       | ARM64 推荐                     |
| 设备       | 理论上不限，需满足 Root / KernelSU 环境 |

> ⚠️ 不同 Android 版本、ROM、Kernel 以及 Twitter/X 版本可能存在兼容性差异。

## 📥 安装

### KernelSU

1. 前往本项目的 **Releases** 页面。
2. 下载最新版本的：

```text
TwitterVideoParser_KSU_Final.zip
```

3. 打开 **KernelSU Manager**。
4. 进入「模块」。
5. 选择「从存储安装」。
6. 选择下载的 ZIP 文件。
7. 等待安装完成。
8. 根据提示重启设备。

安装完成后，在 KernelSU 的模块列表中确认：

```text
TwitterVideoParser
```

已经启用。

## 🔄 更新

当项目发布新版本时：

1. 下载最新 Release。
2. 在 KernelSU Manager 中安装新版 ZIP。
3. 如果 KernelSU 提示需要重启，则重启设备。

建议更新前保留当前可正常工作的版本，以便出现兼容性问题时回退。

## 🗑️ 卸载

可以直接通过：

**KernelSU Manager → 模块 → TwitterVideoParser → 禁用 / 删除**

然后按照提示重启设备。

也可以使用模块提供的卸载机制（如果当前版本包含 `uninstall.sh`）。

## 📂 项目结构

```text
TwitterVideoParser_KSU_Final/
├── module.prop
├── service.sh
├── customize.sh
├── uninstall.sh
├── system/
└── README.md
```

实际目录结构可能会随着版本更新而变化。

## ⚙️ 工作方式

本项目以 KernelSU 模块的形式运行，通过模块脚本在系统启动阶段执行相关初始化操作。

模块不会直接修改 Twitter/X APK，而是在 Root 环境下通过系统级方式提供相关功能。

## 🧪 测试环境

项目主要针对以下类型的环境进行测试：

* Android + KernelSU
* ARM64 Android 设备
* 已获取 Root 权限的 Samsung / One UI 设备

由于 Android 各版本对 `/data`、SELinux、应用沙箱以及系统服务的限制不同，因此其他设备上的行为可能有所区别。

## ⚠️ 注意事项

1. 本模块需要 Root / KernelSU 环境。
2. 使用前请确保设备能够正常进入系统并且 KernelSU 工作正常。
3. 不同 ROM 和 Android 版本可能存在兼容性问题。
4. 安装或更新模块前建议保留可恢复的 Root 环境。
5. 如果安装后出现异常，可以先通过 KernelSU 禁用模块并重启。
6. 不建议同时启用功能相同或存在冲突的模块。
7. 请勿在不了解模块功能的情况下修改模块内部文件。

## 🐛 问题反馈

如果遇到问题，请提供尽可能完整的信息：

```text
设备型号：
Android 版本：
One UI / ROM 版本：
KernelSU 版本：
Twitter/X 版本：
模块版本：
问题描述：
相关日志：
```

如果涉及模块运行问题，请同时提供相关日志，这会比一句“不能用”更有助于定位问题。人类的软件调试已经够艰难了，至少让日志参与一下劳动。

## 📦 Release

稳定版本请前往 GitHub **Releases** 页面下载。

推荐普通用户使用最新的正式 Release，而不是直接下载源码。

## 📜 License

本项目的许可证以仓库中的 `LICENSE` 文件为准。

如果仓库没有提供 `LICENSE` 文件，则默认保留项目作者的版权，不代表允许任意复制、修改或重新发布。

## ⭐ 支持项目

如果这个模块对你有帮助，可以给项目点一个 ⭐ Star。

感谢所有测试、反馈和提交 Issue 的用户。

---

**TwitterVideoParser KSU**

KernelSU Module for Android
