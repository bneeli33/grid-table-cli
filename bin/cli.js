#!/usr/bin/env node
'use strict'

import { program } from 'commander'
import { execSync } from 'child_process'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { generateComponentCode } from '../lib/generator.js'

program
  .name('gridtable')
  .description('CLI tool for GridTable component')
  .version('1.0.0')

program
  .command('init')
  .description('Clone the Symbols starter template')
  .action(() => {
    console.log('Cloning Symbols starter template...')
    try {
      execSync('git clone https://github.com/symbo-ls/starter-kit.git', { 
        stdio: 'inherit' 
      })
      console.log('✓ Template cloned successfully!')
      console.log('Run: cd starter-kit && npm install')
    } catch (error) {
      console.error('Error cloning repository:', error.message)
    }
  })

program
  .command('create')
  .description('Generate GridTable component in ./src directory')
  .option('-x, --columns <number>', 'Number of columns', '16')
  .option('-y, --rows <number>', 'Number of rows', '8')
  .action((options) => {
    const columns = parseInt(options.columns)
    const rows = parseInt(options.rows)
    
    console.log(`Generating GridTable: ${columns} columns × ${rows} rows`)
    
    const srcDir = resolve(process.cwd(), 'src')
    if (!existsSync(srcDir)) {
      mkdirSync(srcDir, { recursive: true })
      console.log('✓ Created src directory')
    }
    
    const code = generateComponentCode(columns, rows)
    const outputPath = resolve(srcDir, 'GridTable.js')
    
    writeFileSync(outputPath, code)
    
    console.log(`✓ Component generated: ${outputPath}`)
  })

program.parse()
