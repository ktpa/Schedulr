// Inspired from
// https://gist.github.com/artemkrynkin/e6bf05d0f61ca3b2ed7e51291ad3a0bf

const removeModules = ({
  matrix,
  removeFinderPattern = false,
  removeCenterModules = false
}) => {
  const size = matrix.size

  const finderPatternModules = removeFinderPattern ? size - 7 : 0
  const centerModules = removeCenterModules ? (size - 7 * 3) / 2 + 7 : 0

  const pos = [
    // top-left
    [0, 0],
    // top-right
    [finderPatternModules, 0],
    // center
    [centerModules, centerModules],
    // bottom-left
    [0, finderPatternModules]
  ]

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        matrix.set(row + r, col + c, false, true)
      }
    }
  }
}

const qrModulesDataRender = (data, size, moduleSize) => {
  let svg = ''

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const prevCol = col - 1
    const nextCol = col + 1
    const row = Math.floor(i / size)

    const currentValue = data[i]
    const prevValue = col && Boolean(data[i - 1])
    const nextValue = nextCol !== size && Boolean(data[i + 1])
    const prevValueTRow = Boolean(data[i - size])
    const nextValueBRow = Boolean(data[i + size])
    const prevValueTRowPrevCol = Boolean(data[i - 1 - size])
    const nextValueBRowPrevCol = Boolean(data[i - 1 + size])
    const prevValueTRowNextCol = Boolean(data[i + 1 - size])
    const nextValueBRowNextCol = Boolean(data[i + 1 + size])

    let moduleStyle = ''

    if (currentValue) {
      if (col && !prevValue && nextValueBRow && nextValueBRowPrevCol) {
        moduleStyle = 'n_rb'

        svg += `<g transform="translate(${prevCol * moduleSize}, ${row *
          moduleSize})"><use xlink:href="#${moduleStyle}"/></g>`
      }

      if (col && !prevValue && prevValueTRow && prevValueTRowPrevCol) {
        moduleStyle = 'n_rt'

        svg += `<g transform="translate(${prevCol * moduleSize}, ${row *
          moduleSize})"><use xlink:href="#${moduleStyle}"/></g>`
      }

      if (
        nextCol !== size &&
        !nextValue &&
        nextValueBRow &&
        nextValueBRowNextCol
      ) {
        moduleStyle = 'n_lb'

        svg += `<g transform="translate(${nextCol * moduleSize}, ${row *
          moduleSize})"><use xlink:href="#${moduleStyle}"/></g>`
      }

      if (
        nextCol !== size &&
        !nextValue &&
        prevValueTRow &&
        prevValueTRowNextCol
      ) {
        moduleStyle = 'n_lt'

        svg += `<g transform="translate(${nextCol * moduleSize}, ${row *
          moduleSize})"><use xlink:href="#${moduleStyle}"/></g>`
      }

      if (!prevValue && nextValue && prevValueTRow && !nextValueBRow) {
        moduleStyle = 'rt'
      } else if (!prevValue && nextValue && !prevValueTRow && nextValueBRow) {
        moduleStyle = 'rb'
      } else if (prevValue && !nextValue && !prevValueTRow && nextValueBRow) {
        moduleStyle = 'lb'
      } else if (prevValue && !nextValue && prevValueTRow && !nextValueBRow) {
        moduleStyle = 'lt'
      } else if (!prevValue && !nextValue && prevValueTRow && !nextValueBRow) {
        moduleStyle = 't'
      } else if (prevValue && !nextValue && !prevValueTRow && !nextValueBRow) {
        moduleStyle = 'l'
      } else if (!prevValue && nextValue && !prevValueTRow && !nextValueBRow) {
        moduleStyle = 'r'
      } else if (!prevValue && !nextValue && !prevValueTRow && nextValueBRow) {
        moduleStyle = 'b'
      } else if (!prevValue && !nextValue && !prevValueTRow && !nextValueBRow) {
        moduleStyle = 'empty'
      } else {
        moduleStyle = 'rect'
      }

      svg += `<g transform="translate(${col * moduleSize}, ${row *
        moduleSize})"><use xlink:href="#${moduleStyle}"/></g>`
    }
  }

  return svg
}

export const qrRender = (qrData, customOptions, cb) => {
  const options = {
    color: 'colored',
    logo: 'fillstuff',
    ...customOptions
  }

  removeModules({
    matrix: qrData.modules,
    removeFinderPattern: true,
    removeCenterModules: options.logo !== 'none'
  })

  const data = qrData.modules.data
  const size = qrData.modules.size
  const moduleSize = 97
  const moduleColor = options.color === 'colored' ? '#2B3544' : '#000000'

  const logoSvg = `
    <g id="fillstuff_logo" stroke="none" stroke-width="1" fill="none">
      <rect fill="#3751FE"  width="${moduleSize * 7}" height="${moduleSize *
    7}" rx="150"/>
        <path transform="translate(90, 90)" fill="#ffffff" d="M141.2,249.9c-4.1-3.7-7.7-6.8-11.1-10.1c-20.4-20.3-30.5-45-30-73.7c0.5-26,9.8-48.7,28.1-67.3
        c22.8-23.3,45.7-46.5,69.3-69.1C227,1.8,274.3,2.7,303.3,31.3c22.5,22.3,44.9,44.7,67.2,67.2c37.5,37.9,37.9,100.3,0.9,138.7
        c-4.1,4.3-8.8,8-14.3,13c5.4,4.8,9.9,8.5,14,12.7c37.7,39.2,37,101.3-1.5,139.8c-21.6,21.7-43.3,43.3-65,65
        c-30.8,30.7-78,31.4-109.3,1c-23.2-22.5-46.1-45.4-68.5-68.7c-36.6-38.1-35.6-100.6,1.8-138C132.5,258.2,136.5,254.5,141.2,249.9z
         M230.2,386.2c0-1.6,0-3,0-4.5c0-12.6-0.1-25.2,0.1-37.8c0-2.8-0.8-4.7-2.8-6.6c-19-18.9-37.9-37.8-56.9-56.8
        c-0.9-0.9-1.9-1.7-3.1-2.9c-3.9,4-7.7,7.7-11.3,11.5c-23.6,24.3-23.4,62.3,0.6,86.2c22,22,44.1,44.1,66.1,66.1
        c15.5,15.5,38,15.5,53.6,0c22-21.9,43.9-43.8,65.8-65.8c24.5-24.6,24.3-62.9-0.2-87.4c-36.4-36.4-72.8-72.8-109.2-109.1
        c-1.8-1.8-2.7-3.6-2.6-6.2c0.2-7,0-14.1,0.1-21.1c0.2-16.2,10.4-30.5,25.7-35.7c3.9-1.3,8.1-1.7,12.8-2.6c0,2.6,0,4.2,0,5.7
        c0,12.5-0.1,24.9,0.1,37.4c0,2.1,1.1,4.7,2.6,6.1c18.9,19.1,38,38.1,57,57.2c0.9,0.9,1.9,1.7,3.1,2.9c3.7-3.9,7.1-7.4,10.5-10.9
        c24.1-24.1,24.5-62.3,0.5-86.6c-22.1-22.5-44.5-44.7-66.9-67c-15.1-15-37.7-14.7-52.7,0.3c-21.9,21.8-43.7,43.7-65.6,65.5
        c-25.3,25.3-25.3,63.3-0.1,88.5c36.1,36.1,72.2,72.2,108.4,108.3c2,2,3,4,2.9,6.9c-0.2,7,0,14.1-0.1,21.1
        C268.4,369.7,250.8,387,230.2,386.2z"/>
    </g>
`
  const logoSvgMask = `
  <use fill="none" fill-rule="evenodd" transform="translate(${((size - 7 * 3) /
    2 +
    7) *
    moduleSize}, ${((size - 7 * 3) / 2 + 7) *
    moduleSize})" xlink:href="#fillstuff_logo"/>
`

  const imageSvg = `
    <g id="image_center">
      <defs>
        <pattern id="image" x="0" y="0" height="100%" width="100%" viewBox="0 0 300 300">
          <image x="0" y="0" width="300" height="300" xlink:href="${
            options.image
          }"/>
        </pattern>
      </defs>
      <rect fill="url(#image)" x="0" y="0" width="${moduleSize *
        7}" height="${moduleSize *
    7}" rx="50%" stroke="rgba(0, 0, 0, 0.1)" stroke-width="0.2%"/>
    </g>
`
  const imageSvgMask = `
  <use fill="none" fill-rule="evenodd" transform="translate(${((size - 7 * 3) /
    2 +
    7) *
    moduleSize}, ${((size - 7 * 3) / 2 + 7) *
    moduleSize})" xlink:href="#image_center"/>
`

  const qrSvg = `
<svg viewBox="0 0 ${moduleSize * size} ${moduleSize *
    size}" width="100%" height="100%" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <rect id="rect" width="100" height="100" fill="currentColor"/>
    <path id="empty" d="M0,28.6v42.9C0,87.3,12.8,100,28.6,100h42.9c15.9,0,28.6-12.8,28.6-28.6V28.6C100,12.7,87.2,0,71.4,0H28.6 C12.8,0,0,12.8,0,28.6z" fill="currentColor"/>
    <path id="b" d="M0,0 L66,0 C84.7776815,-3.44940413e-15 100,15.2223185 100,34 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" transform="rotate(-90 50 50)" fill="currentColor"/>
    <path id="r" d="M0,0 L66,0 C84.7776815,-3.44940413e-15 100,15.2223185 100,34 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" transform="rotate(-180 50 50)" fill="currentColor"/>
    <path id="l" d="M0,0 L66,0 C84.7776815,-3.44940413e-15 100,15.2223185 100,34 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" fill="currentColor"/>
    <path id="t" d="M0,0 L66,0 C84.7776815,-3.44940413e-15 100,15.2223185 100,34 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" transform="rotate(90 50 50)" fill="currentColor"/>
    <path id="lt" d="M0,0 L100,0 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" fill="currentColor"/>
    <path id="lb" d="M0,0 L100,0 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" transform="rotate(-90 50 50)" fill="currentColor"/>
    <path id="rb" d="M0,0 L100,0 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" transform="rotate(-180 50 50)" fill="currentColor"/>
    <path id="rt" d="M0,0 L100,0 L100,66 C100,84.7776815 84.7776815,100 66,100 L0,100 L0,0 Z" transform="rotate(90 50 50)" fill="currentColor"/>
    <path id="n_lt" d="M30.5,2V0H0v30.5h2C2,14.7,14.8,2,30.5,2z" fill="currentColor"/>
    <path id="n_lb" d="M2,69.5H0V100h30.5v-2C14.7,98,2,85.2,2,69.5z" fill="currentColor"/>
    <path id="n_rt" d="M98,30.5h2V0H69.5v2C85.3,2,98,14.8,98,30.5z" fill="currentColor"/>
    <path id="n_rb" d="M69.5,98v2H100V69.5h-2C98,85.3,85.2,98,69.5,98z" fill="currentColor"/>
    <path id="point" d="M600.001786,457.329333 L600.001786,242.658167 C600.001786,147.372368 587.039517,124.122784 581.464617,118.535383 C575.877216,112.960483 552.627632,99.9982143 457.329333,99.9982143 L242.670667,99.9982143 C147.372368,99.9982143 124.122784,112.960483 118.547883,118.535383 C112.972983,124.122784 99.9982143,147.372368 99.9982143,242.658167 L99.9982143,457.329333 C99.9982143,552.627632 112.972983,575.877216 118.547883,581.464617 C124.122784,587.027017 147.372368,600.001786 242.670667,600.001786 L457.329333,600.001786 C552.627632,600.001786 575.877216,587.027017 581.464617,581.464617 C587.039517,575.877216 600.001786,552.627632 600.001786,457.329333 Z M457.329333,0 C653.338333,0 700,46.6616668 700,242.658167 C700,438.667167 700,261.332833 700,457.329333 C700,653.338333 653.338333,700 457.329333,700 C261.332833,700 438.667167,700 242.670667,700 C46.6616668,700 0,653.338333 0,457.329333 C0,261.332833 0,352.118712 0,242.658167 C0,46.6616668 46.6616668,0 242.670667,0 C438.667167,0 261.332833,0 457.329333,0 Z M395.996667,200 C480.004166,200 500,220.008332 500,303.990835 C500,387.998334 500,312.001666 500,395.996667 C500,479.991668 480.004166,500 395.996667,500 C312.001666,500 387.998334,500 304.003333,500 C220.008332,500 200,479.991668 200,395.996667 C200,312.001666 200,350.906061 200,303.990835 C200,220.008332 220.008332,200 304.003333,200 C387.998334,200 312.001666,200 395.996667,200 Z" fill="currentColor"/>
    ${options.logo === 'fillstuff' ? logoSvg : ''}
    ${options.logo === 'image' && options.image ? imageSvg : ''}
  </defs>
  <g transform="translate(0,0)">
    ${qrModulesDataRender(data, size, moduleSize)}
    <use fill-rule="evenodd" transform="translate(0,0)" xlink:href="#point"/>
    <use fill-rule="evenodd" transform="translate(${size * moduleSize -
      700},0)" xlink:href="#point"/>
    <use fill-rule="evenodd" transform="translate(0,${size * moduleSize -
      700})" xlink:href="#point"/>
    ${options.logo === 'fillstuff' ? logoSvgMask : ''}
    ${options.logo === 'image' && options.image ? imageSvgMask : ''}
  </g>
</svg>
`

  const svg = `
<svg viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <g id="qr" style="color: ${moduleColor}">${qrSvg}</g>
  </defs>
  <g clip-path="url(#main-mask)">
    <use x="0" y="0" xlink:href="#qr" transform="scale(1)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </g>
</svg>
`

  if (typeof cb === 'function') {
    cb(null, svg)
  }

  return svg
}
