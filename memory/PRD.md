# PRD - Voletron Engenharia Elétrica Landing Page

## Data: Dezembro 2025 (Atualizado)

## Problema Original
Criar landing page profissional de alta conversão para empresa de engenharia elétrica especializada em energia solar (Voletron Engenharia Elétrica). Foco em geração de leads para WhatsApp com linguagem técnica profissional.

## Arquitetura
- **Frontend**: React + TailwindCSS
- **Backend**: FastAPI (não utilizado - landing page estática)
- **Estilo**: Single-page landing page com scroll suave

## User Personas
- **Residencial**: Donos de casa em Salvador e região metropolitana
- **Comercial**: Empresas, mercados, comércios buscando reduzir custos operacionais

## Core Requirements
1. Linguagem técnica e profissional (sem promessas genéricas)
2. Calculadora comercial com tarifa Fio B
3. Múltiplos CTAs para WhatsApp (71999192508)
4. Seções: Calculadora, Engenheiro, Projetos, Diferenciais
5. Visual premium com cores da marca (Navy #1e3a5f + Laranja #f5a623)
6. Fotos e vídeo reais de projetos do cliente

## O que foi implementado (v2)
- Header com navegação + CTA WhatsApp
- Hero section com headline técnico profissional
- **Calculadora comercial** com:
  - Modo kWh ou R$
  - Seletor de ano (2026=R$0.28, 2027=R$0.31)
  - Cálculo de economia baseado em tarifa Fio B
- **Formulário de lead** (nome, telefone, valor conta)
- Seção técnica "Como Trabalhamos"
- **Seção "Sobre o Engenheiro"** com fotos discretas do Diego Teixeira
- **Seção "Por que escolher um engenheiro"**
- Galeria de 4 projetos com fotos reais + vídeo
- CTA final com linguagem técnica
- Footer completo
- Botão flutuante de WhatsApp
- Preparado para Google Analytics e Facebook Pixel
- Responsividade mobile completa

## Assets do Cliente
- Logo: LOGO VOLETRON.png
- 4 fotos de instalações solares
- 1 vídeo de projeto (Entre Rios)
- 4 fotos do engenheiro Diego Teixeira

## Fórmulas da Calculadora
- Modo kWh: valor_final = consumo_kwh × tarifa_fio_b
- Modo R$: consumo = valor/1.30, valor_final = consumo × tarifa_fio_b
- Tarifas: 2026=R$0.28, 2027=R$0.31

## Backlog (P2)
- Configurar IDs reais do Google Analytics
- Configurar ID real do Facebook Pixel
- Adicionar depoimentos de clientes
