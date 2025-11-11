---
title: MMRL复现笔记
date: 2025-11-5 23:40:55
---

1. paper
MMRL论文链接： https://arxiv.org/abs/2503.08497
MMRL++论文链接： https://arxiv.org/abs/2505.10088
2. 环境配置
    1. miniconda
    问题A： 新版miniconda不支持glibc==2.27
    答案： 下载旧版 如：https://repo.anaconda.com/miniconda/Miniconda3-py312_24.5.0-0-Linux-x86_64.sh 
    2. cuda
    服务器安装 11.3，https://blog.csdn.net/weixin_42608740/article/details/146591681
    3. 显卡占用查询
    watch -n 1 nvidia-smi
3. 数据集准备

    